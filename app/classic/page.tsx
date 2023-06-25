import BasicTodo from "@/app/components/client/BasicTodo";



const ClassicTodo = () => {
    return (
        <main className="h-full  max-w-screen w-full bg bg-1 flex  flex-col items-center  gap-4 p-4 sm:p-6 md:p-24 pt-10">
        <h1 className="text-xl font-semibold flex-shrink underline">Classic Todo App</h1>
        <BasicTodo />
      </main>
    );
};

export default ClassicTodo;