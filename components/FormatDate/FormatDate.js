import { inter } from "../../styles/fonts/fonts";

export default function FormatDate({ date }) {
  let formattedDate = new Date(date);

  if (isNaN(formattedDate.valueOf())) {
    return null;
  }

  const timeformat = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const weekday = formattedDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const day = formattedDate.toLocaleDateString("en-US", { day: "numeric" });
  const month = formattedDate.toLocaleDateString("en-US", { month: "long" });
  const year = formattedDate.toLocaleDateString("en-US", { year: "numeric" });
  const time = formattedDate.toLocaleTimeString("en-US", timeformat);

  return (
    <div
      className={inter.className}
    >{`${weekday} ${time} ${day} ${month} ${year}`}</div>
  );
}
