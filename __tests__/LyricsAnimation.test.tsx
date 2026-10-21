import { afterEach, beforeEach, expect, it, jest } from "@jest/globals";
import { act, render, screen } from "@testing-library/react-native";
import { FlatList } from "react-native";
import { LineType } from "clrc";
import LyricsAnimation from "@/components/LyricsAnimation";
import type { EnhancedLrc } from "@/types";

jest.mock("@/components/GradientBackground", () => () => null);
jest.mock("@/components/LyricsLine", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return function MockLyricsLine({
    line,
    isActiveLine,
  }: {
    line: EnhancedLrc;
    isActiveLine: boolean;
  }) {
    return React.createElement(
      Text,
      { testID: `line-${line.lineNumber}` },
      isActiveLine ? "active" : "inactive",
    );
  };
});

const lyrics: EnhancedLrc[] = [0, 1000, 2500].map(
  (startMillisecond, lineNumber) => ({
    lineNumber,
    startMillisecond,
    raw: "",
    content: `Line ${lineNumber}`,
    type: LineType.ENHANCED_LYRIC,
    words: [],
  }),
);

beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(FlatList.prototype, "scrollToIndex").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
  jest.useRealTimers();
});

it("activates and scrolls to the next lyric at its timestamp", async () => {
  await render(<LyricsAnimation parsedLrc={lyrics} />);
  expect(screen.getByTestId("line-0")).toHaveTextContent(/^active$/);

  await act(() => jest.advanceTimersByTime(999));
  expect(FlatList.prototype.scrollToIndex).not.toHaveBeenCalled();

  await act(() => jest.advanceTimersByTime(1));
  expect(screen.getByTestId("line-1")).toHaveTextContent(/^active$/);
  expect(FlatList.prototype.scrollToIndex).toHaveBeenLastCalledWith({
    index: 1,
    animated: true,
  });

  await act(() => jest.advanceTimersByTime(1500));
  expect(screen.getByTestId("line-2")).toHaveTextContent(/^active$/);
  expect(FlatList.prototype.scrollToIndex).toHaveBeenLastCalledWith({
    index: 2,
    animated: true,
  });

  await act(() => jest.advanceTimersByTime(10000));
  expect(FlatList.prototype.scrollToIndex).toHaveBeenCalledTimes(2);
});

it("cancels the pending lyric transition when unmounted", async () => {
  const view = await render(<LyricsAnimation parsedLrc={lyrics} />);
  await view.unmount();
  await act(() => jest.advanceTimersByTime(10000));
  expect(FlatList.prototype.scrollToIndex).not.toHaveBeenCalled();
});

it("renders an empty lyric list without scheduling a transition", async () => {
  await render(<LyricsAnimation parsedLrc={[]} />);
  await act(() => jest.advanceTimersByTime(10000));
  expect(FlatList.prototype.scrollToIndex).not.toHaveBeenCalled();
});
