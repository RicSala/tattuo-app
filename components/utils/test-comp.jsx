"use client";

export function TestComp(props) {
  return (
    <div className="flex gap-2">
      <h2>Global error handling testers</h2>
      <button
        onClick={() => {
          console.log("throwing error");
          throw new Error("Test Error");
        }}
      >
        Trigger Error
      </button>

      <button
        onClick={() => Promise.reject(new Error("Test Promise Rejection"))}
      >
        Trigger Promise Rejection
      </button>
    </div>
  );
}
