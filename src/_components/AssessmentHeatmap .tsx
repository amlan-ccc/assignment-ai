import React from "react";

interface AssessmentSubmissionProps {
  scores: {
    date: string;
    totalAssessments: number;
    subject: string;
    chapter: string;
    topic: string;
  }[];
}

const AssessmentSubmissionHeatmap: React.FC<AssessmentSubmissionProps> = ({
  scores,
}) => {
  const generateYearDates = (year: number) => {
    const dates = [];
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
    return dates;
  };

  const scoresMap = scores.reduce((acc, score) => {
    acc[score.date] = score;
    return acc;
  }, {} as Record<string, (typeof scores)[0]>);

  const getColor = (count: number): string => {
    if (count === 0) return "hsl(0, 0%, 85%)";
    if (count >= 1 && count <= 2) return "hsl(0, 0%, 70%)";
    if (count >= 3 && count <= 5) return "hsl(120, 40%, 75%)";
    if (count >= 6 && count <= 8) return "hsl(120, 50%, 60%)";
    if (count >= 9 && count <= 11) return "hsl(120, 60%, 45%)";
    return "hsl(120, 70%, 30%)";
  };

  const yearDates = generateYearDates(2024);
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];

  const firstDate = yearDates[0];
  const startDay = firstDate.getDay();

  for (let i = 0; i < startDay; i++) {
    currentWeek.push(new Date(2023, 11, 31 - (startDay - 1 - i)));
  }

  yearDates.forEach((date) => {
    currentWeek.push(date);

    if (currentWeek.length === 7) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      const lastDate = currentWeek[currentWeek.length - 1];
      const nextDate = new Date(lastDate);
      nextDate.setDate(nextDate.getDate() + 1);
      currentWeek.push(nextDate);
    }
    weeks.push(currentWeek);
  }

  const getMonthLabels = () => {
    const labels: { month: string; position: number }[] = [];
    let currentMonth = -1;

    weeks.forEach((week, weekIndex) => {
      const firstValidDate = week.find((date) => date.getFullYear() === 2024);
      if (firstValidDate) {
        const month = firstValidDate.getMonth();
        if (month !== currentMonth) {
          labels.push({
            month: monthNames[month],
            position: weekIndex,
          });
          currentMonth = month;
        }
      }
    });

    return labels;
  };

  const monthLabels = getMonthLabels();

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="relative">
            {/* Month labels */}
            <div className="relative h-5 mb-2" style={{ marginLeft: "32px" }}>
              {monthLabels.map((label, index) => (
                <div
                  key={index}
                  className="absolute text-xs text-gray-600 font-medium"
                  style={{
                    left: `${label.position * 16}px`,
                  }}
                >
                  {label.month}
                </div>
              ))}
            </div>

            <div className="flex">
              <div className="flex flex-col w-8 mr-1">
                {dayNames.map((day, index) => (
                  <div
                    key={day}
                    className="text-xs text-gray-600 h-3 flex items-center justify-end pr-1"
                    style={{
                      marginBottom: "4px",
                      visibility: index % 2 === 1 ? "visible" : "hidden",
                    }}
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="flex gap-1">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((date, dayIndex) => {
                      const dateStr = date.toISOString().split("T")[0];
                      const assessmentData = scoresMap[dateStr];
                      const count = assessmentData?.totalAssessments || 0;
                      const isCurrentYear = date.getFullYear() === 2024;

                      return (
                        <div
                          key={`${weekIndex}-${dayIndex}`}
                          className={`w-3 h-3 rounded border border-gray-200 cursor-pointer transition-all hover:border-gray-400 ${
                            !isCurrentYear ? "opacity-30" : ""
                          }`}
                          style={{
                            backgroundColor: isCurrentYear
                              ? getColor(count)
                              : "hsl(0, 0%, 95%)",
                          }}
                          title={
                            isCurrentYear && assessmentData
                              ? `${dateStr}: ${count} assessments\nSubject: ${assessmentData.subject}\nChapter: ${assessmentData.chapter}\nTopic: ${assessmentData.topic}`
                              : `${dateStr}: No assessments`
                          }
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-start gap-5 mt-4">
            <div className="text-xs text-gray-600">Less</div>
            <div className="flex items-center gap-1">
              <div
                className="w-3 h-3 rounded border border-gray-200"
                style={{ backgroundColor: "hsl(0, 0%, 85%)" }}
                title="0-2 assessments"
              />
              <div
                className="w-3 h-3 rounded border border-gray-200"
                style={{ backgroundColor: "hsl(120, 40%, 75%)" }}
                title="3-5 assessments"
              />
              <div
                className="w-3 h-3 rounded-sm border border-gray-200"
                style={{ backgroundColor: "hsl(120, 50%, 60%)" }}
                title="6-8 assessments"
              />
              <div
                className="w-3 h-3 rounded border border-gray-200"
                style={{ backgroundColor: "hsl(120, 60%, 45%)" }}
                title="9-11 assessments"
              />
              <div
                className="w-3 h-3 rounded border border-gray-200"
                style={{ backgroundColor: "hsl(120, 70%, 30%)" }}
                title="12+ assessments"
              />
            </div>
            <div className="text-xs text-gray-600">More</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentSubmissionHeatmap;
