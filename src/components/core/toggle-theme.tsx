import { useMode } from "../../store/useModeStore";

export function ThemeToggle() {
  const { theme, toggleTheme } = useMode();

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id="theme-switch"
        className="peer hidden"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <label
        htmlFor="theme-switch"
        className="flex items-center cursor-pointer select-none text-[12px] text-[#78768d] font-bold leading-[15px] relative"
      >
        <span className="block h-[15px] overflow-hidden relative w-[35px] mr-2">
          <span
            className={`absolute left-0 top-0 transition-all duration-300 ease-in-out ${theme === "dark" ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"
              }`}
          >
            Light
          </span>
          <span
            className={`absolute left-0 top-0 transition-all duration-300 ease-in-out ${theme === "dark" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
              }`}
          >
            Dark
          </span>

        </span>
        <span className={`h-[15px] w-[25px] rounded-full relative transition-all duration-300 ease-in-out ${theme === "dark" ? "bg-[#ffb500]" : "bg-[#05012c]"
          } before:content-[''] before:block before:h-[13px] before:w-[13px] before:bg-white before:rounded-[13px] before:absolute before:left-px before:top-px before:transition-transform before:duration-300 before:ease-in-out before:shadow-[0_3px_1px_0_rgba(37,34,71,0.05),0_2px_2px_0_rgba(37,34,71,0.1),0_3px_3px_0_rgba(37,34,71,0.05)] ${theme === "dark" ? "before:translate-x-[10px]" : "before:translate-x-0"
          }`}
        />
      </label>
    </div>
  );
}