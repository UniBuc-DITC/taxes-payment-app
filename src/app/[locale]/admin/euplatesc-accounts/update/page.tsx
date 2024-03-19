import Navbar from "@/components/navbar";
import EditAccount from "@/components/forms/admin/editAccount";

type Props = {
  searchParams: {
    id: string;
    name: string;
    description?: string;
    merchantId: string;
    secretKey: string;
  };
};

export default async function EditEuPlatescAccountPage({ searchParams }: Props) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <EditAccount searchParams={searchParams}/>
    </div>
  );
}
