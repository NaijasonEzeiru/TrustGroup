import { getUser } from "@/actions";
import CreateTransactions from "./trans-table";

export const dynamic = "force-dynamic";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const user = await getUser(id);
  console.log({ trrr: user });

  return (
    <div>
      {/* {user?.user?.trans.map((e, i) => (
        <p key={i}>{e}</p>
      ))} */}
      <CreateTransactions
        trans={user?.user?.trans || []}
        id={user.user?.account_no!}
      />
    </div>
  );
};

export default page;
