import React from "react";
import { IoArchive, IoPencil, IoTrash } from "react-icons/io5";
import { Category } from "../types/Category";

interface NoteCardProps {
  date: string;
  title: string;
  content: string;
  category?: Category | null;
  onEdit: () => void;
  onDelete: () => void;
  onArchive: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  date,
  title,
  content,
  category,
  onEdit,
  onDelete,
  onArchive,
}) => {
  return (
    <div className="border my-[10px] rounded p-5 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-s font-medium">{title}</h6>
          <span className="text-s text-slate-500">{date}</span>
        </div>
      </div>
      <p className="">{content?.slice(0, 75)}</p>
      {category && (
        <div className="text-sm text-slate-500">Category: {category.name}</div>
      )}
      <div className="flex items-center gap-5 mt-3">
        <IoPencil className="icon-btn hover:text-blue-500" onClick={onEdit} />
        <IoTrash className="icon-btn hover:text-red-500" onClick={onDelete} />
        <IoArchive
          className="icon-btn hover:text-yellow-500"
          onClick={onArchive}
        />
      </div>
    </div>
  );
};

export default NoteCard;
