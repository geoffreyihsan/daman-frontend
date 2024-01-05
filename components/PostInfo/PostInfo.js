import { FormatDate } from "../../components";

export default function PostInfo({ date, className }) {
  if (!date) {
    return null;
  }

  return (
    <div className={className}>
      {"Posted on "}
      {date && (
        <time dateTime={date}>
          <FormatDate date={date} />
        </time>
      )}
    </div>
  );
}
