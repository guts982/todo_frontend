import Advanced from "./components/client/Advanced";

export default function Home() {
  return (
    <div className={` h-[88vh]  max-w-screen w-full bg p-10 py-0 bg-mos`}>
      <div className="bg-white ">{process.env.NEXT_PUBLIC_API_URL}</div>
      <Advanced />
    </div>
  );
}
