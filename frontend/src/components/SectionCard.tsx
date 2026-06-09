type Props = {
  title: string;
  children: React.ReactNode;
};

function SectionCard({
  title,
  children
}: Props) {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        p-6
        mb-6
      "
    >

      <h2
        className="
          text-2xl
          font-bold
          mb-4
        "
      >
        {title}
      </h2>

      {children}

    </div>
  );
}

export default SectionCard;