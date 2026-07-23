const SectionHeading = ({ title }) => {
  return (
    <div className="flex items-center gap-5 my-16">
      <div className="h-[2px] flex-1 bg-blue-300"></div>

      <h2 className="text-2xl font-bold uppercase tracking-widest text-[#0D4C92]">
        {title}
      </h2>

      <div className="h-[2px] flex-1 bg-blue-300"></div>
    </div>
  );
};

export default SectionHeading;