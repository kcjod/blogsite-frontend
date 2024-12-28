type Props = {};

export default function Quote({}: Props) {
  return (
    <div className="flex items-center justify-center bg-gray-100 w-full lg:w-1/2 px-6 py-10 lg:py-0">
      <div className="text-center max-w-lg">
        <p className="text-xl lg:text-3xl font-bold italic mb-4">
          "The customer service I received was exceptional. The support team went above and
          beyond to address my concerns."
        </p>
        <p className="text-sm lg:text-md font-medium text-gray-700">
          Jules Winnfield
          <br />
          <span className="text-gray-500 text-sm lg:text-lg">CEO, Acme Inc</span>
        </p>
      </div>
    </div>
  );
}
