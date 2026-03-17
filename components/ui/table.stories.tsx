import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./table";

const meta: Meta<typeof Table> = {
  title: "UI/Table",
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Últimas transacciones de ejemplo en sandbox.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Fecha</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Monto</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>2026-03-16</TableCell>
          <TableCell>Recarga</TableCell>
          <TableCell>$ 10.000</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2026-03-15</TableCell>
          <TableCell>Pago servicio</TableCell>
          <TableCell>$ 35.500</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

