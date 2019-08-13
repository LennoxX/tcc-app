import { Sort } from "./sort";

export class Pageable {
   public offset: number;
   public pageNumber: number;
   public pageSize: number;
   public paged: boolean;
   public sort: Sort;

   constructor() {}
}