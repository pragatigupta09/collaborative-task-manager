import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Modal({ children }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded">{children}</div>
    </div>
  );
}
