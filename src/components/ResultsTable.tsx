import React from "react";
import { SlRefresh } from "react-icons/sl";
import { FaDotCircle } from "react-icons/fa";
import {
  capitalizeFirst,
  formatDateFromTimestamp,
  status_color,
} from "../assets/helpers";
import EmptyImg from "../assets/empty.png";
import ClassImg from "../assets/class.png";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import TruncatedText from "./ToolTip";

interface ResultsTableProps {
  results: any[];
}

const status_name = {
  registered: "Live/Registered",
  abandoned: "Dead/Cancelled",
  pending: "Dead/Cancelled",
  other: "Dead/Cancelled",
} as { [key: string]: string };

const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Mark</TableCell>
          <TableCell>Details</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Class/Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {results.map((result) => {
          const row = result._source;
          return (
            <TableRow
              key={result._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* Mark */}
              <TableCell className="flex w-1/6">
                <div className="rounded-xl py-2 bg-white">
                  <img
                    src={EmptyImg}
                    alt="img.png"
                    className="w-full h-20 object-contain"
                  />
                </div>
              </TableCell>

              {/* Details */}
              <TableCell className="w-1/6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <h6 className="font-extrabold">
                      <TruncatedText text={row.mark_identification} />
                    </h6>
                    <p>{row.current_owner}</p>
                  </div>
                  <div className="flex flex-col">
                    <h6>{result._id}</h6>
                    <p>{formatDateFromTimestamp(row.registration_date)}</p>
                  </div>
                </div>
              </TableCell>

              {/* Status */}
              <TableCell className="w-1/6">
                <Status row={row} />
              </TableCell>

              {/* Class/Description */}
              <TableCell>
                <div className="flex-flex-col gap-4">
                  <TruncatedText text={row.mark_description_description} />
                  <Classes row={row} />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

interface RowType {
  status_type: string;
  status_date: number;
  renewal_date: number;
}

const Status = ({ row }: { row: RowType }) => {
  const status = row.status_type;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h5
          className={`flex gap-1 items-center font-extrabold ${status_color[status]}`}
        >
          <FaDotCircle />
          {status_name[status]}
        </h5>
        <p>at {formatDateFromTimestamp(row.status_date)}</p>
      </div>
      <div className="flex flex-col">
        <p className="flex items-center text-center gap-2">
          <SlRefresh className="text-red-500 font-extrabold" />
          {formatDateFromTimestamp(row.renewal_date)}
        </p>
      </div>
    </div>
  );
};

const Classes = ({ row }: any) => {
  return (
    <div className="flex gap-2 mt-6 flex-wrap">
      {row?.class_codes?.map((classCode: string, id: number) => (
        <p
          className="flex justify-center items-center gap-1 px-2 py-1 rounded border border-black text-nowrap cursor-pointer hover:opacity-80 bg-white"
          key={id}
        >
          <img src={ClassImg} className="w-6" alt="class" />
          Class {classCode}
        </p>
      ))}
    </div>
  );
};

export default ResultsTable;
