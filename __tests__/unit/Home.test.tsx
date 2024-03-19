/*
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PayDormitoryForm from "@/app/[locale]/admin/test/page";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("PayDormitoryForm", () => {
  it("renders the form with dormitories and handles submission", () => {
   

    render(<PayDormitoryForm />);

    expect(screen.getByLabelText("Select Dormitory")).toBeInTheDocument();
    expect(screen.getByLabelText("Select Tax Value")).toBeInTheDocument();
    expect(screen.getByLabelText("Nume")).toBeInTheDocument();
    expect(screen.getByLabelText("Prenume")).toBeInTheDocument();
    expect(screen.getByLabelText("CNP")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Select Dormitory/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/Select Tax Value/i), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText(/Nume/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Prenume/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/CNP/i), { target: { value: '123456789' } });

    fireEvent.submit(screen.getByRole('button', { name: /Pay Now/i }));
  });
});*/
