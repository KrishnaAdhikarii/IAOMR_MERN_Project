const SpeakerCard = ({ speaker }) => {
    return (
        <div className="group h-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">

            <div className="flex flex-col md:flex-row gap-6 p-6">

                {/* Image */}
                <div className="flex justify-center md:block flex-shrink-0">
                    <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-[#0D4C92]"
                    />
                </div>

                {/* Details */}
                <div className="flex-1 text-center md:text-left">

                    {/* Topic */}
                    {speaker.topic && (
                        <p className="bg-[#0D4C92] text-white font-bold text-sm uppercase leading-6 tracking-wide px-2 py-1 rounded-xl">
                            {speaker.topic}
                        </p>

                    )}

                    {/* Name */}
                    <h3 className="mt-2 text-xl md:text-2xl font-bold text-gray-900">
                        {speaker.name}
                    </h3>

                    {/* Qualification */}
                    {speaker.qualification && (
                        <p className="mt-2 text-sm text-gray-500 whitespace-pre-line">
                            {speaker.qualification}
                        </p>
                    )}

                    {/* Designation */}
                    <p className="mt-2 text-base font-semibold text-[#0D4C92] whitespace-pre-line">
                        {speaker.designation}
                    </p>

                    {/* Organization */}
                    <p className="mt-2 text-gray-600 text-sm leading-6 whitespace-pre-line">
                        {speaker.organization}
                    </p>

                </div>

            </div>
        </div>
    );
};

export default SpeakerCard;