const ScheduleTable = ({ title, data }) => {
    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">

            {/* Header */}
            <div className="bg-[#0D4C92] text-white text-center py-4">
                <h3 className="text-2xl font-bold uppercase">{title}</h3>
            </div>

            <div className="overflow-x-auto">

                <table className="w-full border-collapse">

                    <thead className="bg-[#0D4C92] text-white">

                        <tr>
                            <th className="border p-3 w-16">S.No</th>
                            <th className="border p-3 w-40">Time</th>
                            <th className="border p-3 w-40">Session</th>
                            <th className="border p-3">Topic</th>
                            <th className="border p-3">Resource Person</th>
                        </tr>

                    </thead>

                    <tbody>

                        {data.map((row, index) => (

                            <tr
                                key={index}
                                className={
                                    row.highlight
                                        ? "bg-green-100 font-semibold"
                                        : "hover:bg-blue-50"
                                }
                            >

                                <td className="border p-3 text-center">
                                    {row.sno}
                                </td>

                                <td className="border p-3 whitespace-pre-line">
                                    {row.time}
                                </td>

                                <td className="border p-3 text-center whitespace-pre-line">
                                    {row.session}
                                </td>

                                <td className="border p-3 whitespace-pre-line font-medium text-center align-middle">
                                    {row.topic}
                                </td>

                                <td className="border p-3 text-center align-middle">
  {(() => {
    const lines = row.resourcePerson?.split("\n") || [];
    return (
      <>
        <div className="font-bold">{lines[0]}</div>
        {lines.slice(1).map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </>
    );
  })()}
</td>



                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default ScheduleTable;