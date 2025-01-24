import Navbar from "@/components/navbar";
import EditAccount from "@/components/forms/admin/editAccount";

type Props = {
  searchParams: Promise<{
    id: string;
    name: string;
    description?: string;
    merchantId: string;
    secretKey: string;
  }>;
};

export default async function EditEuPlatescAccountPage(props: Props) {
  const searchParams = await props.searchParams;
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <EditAccount searchParams={searchParams} />
    </div>
  );
}
