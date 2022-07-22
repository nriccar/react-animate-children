interface WindowSize {
    isMobile: boolean;
    width: number;
    height: number;
}
declare const useWindowSize: () => WindowSize;
export default useWindowSize;
