const SpeakerCard = ({ speaker }) => {
  return (
    <div className="group h-full flex flex-col md:flex-row items-center gap-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
      <img
        src={speaker.image}
        alt={speaker.name}
        className="w-28 h-28 rounded-full object-cover border-4 border-blue-100 group-hover:scale-105 transition-transform duration-300"
      />

      <div className="flex-1 flex flex-col gap-2 text-center md:text-left">
        <h3 className="text-xl font-bold text-gray-800 leading-tight">
          {speaker.name}
        </h3>

        <p className="text-blue-700 font-semibold leading-snug">
          {speaker.designation}
        </p>

        <p className="text-gray-600 text-sm leading-6">
          {speaker.organization}
        </p>
      </div>
    </div>
  );
};

export default SpeakerCard;
