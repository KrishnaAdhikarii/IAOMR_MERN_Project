import SpeakerCard from "./SpeakerCard";
import SectionHeading from "./SessionlHeading";

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
                </div>
            </div>
        </section>
    );
};

export default ScientificSession;
