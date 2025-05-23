import React from 'react'

function Notification(props) {
  return (
    <div>
      
<div class="flex flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs z-50">
  <div
    class="succsess-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#232531] px-[10px]"
  >
    <div class="flex gap-2">
      <div class="text-[#2b9875] bg-white/5 backdrop-blur-xl p-1 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          ></path>
        </svg>
      </div>
      <div>
        <p class="text-white">{props.msg}</p>
        <p class="text-gray-500">{props.book}</p>
      </div>
    </div>
    <button
      class="text-gray-600 text-gray-600 hover:bg-white/5 p-1 rounded-md transition-colors ease-linear"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18 18 6M6 6l12 12"
        ></path>
      </svg>
    </button>
  </div>
</div>

    </div>
  )
}

export default Notification
