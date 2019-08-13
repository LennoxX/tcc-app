import { Pageable } from "./pageable";
import { Sort } from "./sort";

export class Page<T>{
   public content: T[];
   public first: boolean;
   public DataPageslast: boolean;
   public number: number;
   public numberOfElements: number;
   public pageable: Pageable;
   public size: number;
   public sort: Sort;
   public totalElements: number;
   public totalPages: number;

   constructor(){}
}    