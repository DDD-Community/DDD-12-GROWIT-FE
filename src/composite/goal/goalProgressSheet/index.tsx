'use client';

import ProgressBar from '@/shared/components/display/ProgressBar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/dropdown-menu';

export default function GoalProgressSheet() {
  const handleEdit = () => {
    // TODO: 목표 수정 로직
    console.log('목표 수정');
  };

  const handleDelete = () => {
    // TODO: 목표 삭제 로직
    console.log('목표 삭제');
  };

  return (
    <div className="w-full max-h-40 h-full bg-elevated-normal rounded-t-lg border-t border-line-normal">
      <div className="w-full flex justify-between text-text-strong pt-5 px-5 pb-4">
        <h2 className="body-1-normal">
          목표 종료까지 <span className="body-1-bold">56일</span> 남았어요
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="z-10 flex items-center justify-center cursor-pointer w-6 h-6 hover:bg-fill-normal rounded transition-colors"
            >
              <svg width="3" height="17" viewBox="0 0 3 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.5 14.25C2.19036 14.25 2.75 14.8096 2.75 15.5C2.75 16.1904 2.19036 16.75 1.5 16.75C0.809644 16.75 0.25 16.1904 0.25 15.5C0.25 14.8096 0.809644 14.25 1.5 14.25ZM1.5 7.25C2.19036 7.25 2.75 7.80964 2.75 8.5C2.75 9.19036 2.19036 9.75 1.5 9.75C0.809644 9.75 0.25 9.19036 0.25 8.5C0.25 7.80964 0.809644 7.25 1.5 7.25ZM1.5 0.25C2.19036 0.25 2.75 0.809644 2.75 1.5C2.75 2.19036 2.19036 2.75 1.5 2.75C0.809644 2.75 0.25 2.19036 0.25 1.5C0.25 0.809644 0.809644 0.25 1.5 0.25Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="end" className="w-40 px-5 py-2">
            <DropdownMenuItem onClick={handleEdit}>
              <div className="body-1-medium text-label-normal h-full flex items-center py-2 gap-x-2">
                <svg
                  className="shrink-0 font-medium"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_3978_13286)">
                    <path
                      d="M13.8853 3.33333C13.8852 3.17338 13.854 3.01497 13.7928 2.86719C13.7316 2.7193 13.6417 2.58454 13.5285 2.47135C13.4154 2.35831 13.281 2.26892 13.1333 2.20768C12.9854 2.14642 12.8266 2.11458 12.6665 2.11458C12.5064 2.11458 12.3476 2.14642 12.1997 2.20768C12.052 2.26892 11.9176 2.35831 11.8045 2.47135L2.92954 11.3457L2.28306 13.7161L4.6535 13.0697L13.5285 4.19531C13.6416 4.08216 13.7316 3.94795 13.7928 3.80013C13.8541 3.65224 13.8853 3.49341 13.8853 3.33333ZM15.2186 3.33333C15.2186 3.6685 15.1529 4.00089 15.0246 4.31055C14.8963 4.62007 14.7081 4.9011 14.4712 5.13802L5.47121 14.138C5.38917 14.2201 5.28691 14.2794 5.17498 14.3099L1.50832 15.3099C1.27757 15.3727 1.03094 15.3071 0.861833 15.138C0.692762 14.9689 0.627063 14.7223 0.689958 14.4915L1.68996 10.8249L1.71795 10.7428C1.75133 10.6631 1.80029 10.5902 1.86183 10.5286L10.8618 1.52865C11.0988 1.29169 11.3803 1.10351 11.69 0.97526C11.9996 0.847058 12.3314 0.78125 12.6665 0.78125C13.0016 0.78125 13.3335 0.847058 13.6431 0.97526C13.9527 1.10351 14.2342 1.29169 14.4712 1.52865C14.7082 1.76564 14.8963 2.04712 15.0246 2.35677C15.1528 2.66637 15.2186 2.99823 15.2186 3.33333Z"
                      fill="#C2C4C8"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3978_13286">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span>수정</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete} variant="destructive">
              <span className="body-1-medium text-label-normal h-full flex items-center py-2 gap-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                  <path d="M3 6h18" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                삭제
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="px-5 pb-5 space-y-2">
        <ProgressBar percentage={50} />
        <p className="body-1-normal text-label-neutral text-sm">25.03.01 ~ 25.03.31</p>
      </div>
    </div>
  );
}
