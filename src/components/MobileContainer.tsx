import { ReactNode } from "react";

interface MobileContainerProps {
  children: ReactNode;
}

export function MobileContainer({ children }: MobileContainerProps) {
  return (
    <div className="relative w-full max-w-[430px] h-[932px] bg-white shadow-2xl rounded-3xl overflow-hidden">
      {children}
    </div>
  );
}
