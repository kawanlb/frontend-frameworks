export default function SideImage() {
  return (
    <section className="relative flex h-full items-end lg:col-span-5 lg:h-full xl:col-span-6">
      <img
        alt=""
        src="/bgsideimage.png"
        className="absolute left-0 top-0 h-full w-full object-cover"
      />
      <img
        alt=""
        src="/25_low.svg"
        className="absolute left-1/2 top-1/2 h-3/5 w-3/5 object-cover transform -translate-x-1/2 -translate-y-1/2 hidden lg:block"
      />
    </section>
  );
}
