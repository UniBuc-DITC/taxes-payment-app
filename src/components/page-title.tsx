type Props = {
  title: string;
};

export default function PageTitle({ title }: Props) {
  return (
    <h1 className="mt-5 text-3xl sm:text-center text-blue-900 px-8">{title}</h1>
  );
}
