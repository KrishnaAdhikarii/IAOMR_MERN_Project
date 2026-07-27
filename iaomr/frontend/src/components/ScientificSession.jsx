import SpeakerCard from "./SpeakerCard";
import SectionHeading from "./SessionlHeading";
import ScheduleTable from "./ScheduleTable";

import {
  day1Schedule,
  day2Schedule,
  panelDiscussion ,
} from "./speaker";

import {
    speakers,
    moderator,
    panelists,
} from "./speaker";

const ScientificSession = () => {
    return (
        <section className="bg-gradient-to-b from-slate-100 to-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Scientific Sessions */}
                <SectionHeading title="Resource Persons for Scientific Sessions" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    {speakers.map((speaker, index) => (
                        <SpeakerCard key={index} speaker={speaker} />
                    ))}
                </div>


                {/* Panel Discussion */}
                <SectionHeading title="Panel Discussion" />

                {/* Moderator */}
                <div className="text-center mb-8">
                    <span className="bg-blue-700 text-white px-8 py-2 rounded-full text-xl font-semibold">
                        Moderator
                    </span>
                </div>

                <div className="max-w-3xl mx-auto">
                    <SpeakerCard speaker={moderator} />
                </div>

                {/* Panelists */}
                <div className="text-center mt-16 mb-10">
                    <span className="bg-blue-700 text-white px-8 py-2 rounded-full text-xl font-semibold">
                        Panelists
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {panelists.map((speaker, index) => (
                        <SpeakerCard key={index} speaker={speaker} />
                    ))}
                </div><SectionHeading title="Scientific Schedule" />

<ScheduleTable
  title="Scientific Schedule - 07 August 2026"
  data={day1Schedule}
/>

<ScheduleTable
  title="Scientific Schedule - 08 August 2026"
  data={day2Schedule}
/>

<SectionHeading title="Panel Discussion" />

<div className="bg-white rounded-2xl shadow-xl p-8">

  <table className="w-full border">

    <tbody>

      <tr>
        <td className="border p-4 font-semibold w-48">Time</td>
        <td className="border p-4">{panelDiscussion.time}</td>
      </tr>

      <tr>
        <td className="border p-4 font-semibold">Session</td>
        <td className="border p-4">{panelDiscussion.session}</td>
      </tr>

      <tr>
        <td className="border p-4 font-semibold">Topic</td>
        <td className="border p-4">{panelDiscussion.topic}</td>
      </tr>

      <tr>
        <td className="border p-4 font-semibold">Moderator</td>
        <td className="border p-4 whitespace-pre-line">
            <div className="font-bold">{panelDiscussion.moderator.name}</div>
            <div className="whitespace-pre-line text-gray-700">{panelDiscussion.moderator.designation}</div>
            <div className="whitespace-pre-line text-gray-600">{panelDiscussion.moderator.organization}</div>
        </td>
      </tr>

      <tr>
        <td className="border p-4 font-semibold align-top">
          Panelists
        </td>

        <td className="border p-4">

          {panelDiscussion.panelists.map((p, i) => (
            <div key={i} className="mb-6">

              <p className="font-bold">{p.name}</p>

              <p className="whitespace-pre-line text-gray-700">
                {p.designation}
              </p>

              <p className="whitespace-pre-line text-gray-600">
                {p.organization}
              </p>

            </div>
          ))}

        </td>
      </tr>

    </tbody>

  </table>

</div>  
            </div>
        </section>
        
    );
};

export default ScientificSession;
