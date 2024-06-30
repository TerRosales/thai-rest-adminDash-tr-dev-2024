import { Button } from "flowbite-react";

function Home() {
  return (
    <div className="max-w-6xl p-10 mx-auto">
      <section className="m-10">
        <h1 className="text-4xl font-bold text-red-500">
          Thai Rest Controller Page
        </h1>
      </section>
      <section className="rounded-2xl flex flex-col m-16 p-5 gap-5 bg-gradient-to-tr from-white to-red-200 border-l-[1px] border-b-[1px] border-red-300 shadow">
        <p className="font-semibold text-red-950">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita est,
          iusto soluta velit saepe labore accusantium totam ipsum ducimus
          dolores distinctio mollitia voluptatibus cupiditate eum, porro nostrum
          ab accusamus optio magnam necessitatibus tempore. Maiores dolor a
          animi itaque obcaecati at blanditiis fugiat molestiae, rerum eveniet
          nulla provident quas aliquid earum.
        </p>
        <Button className="w-[120px]" gradientDuoTone="pinkToOrange">
          Jump to Dashboard
        </Button>
      </section>
    </div>
  );
}

export default Home;
