"use client";
import { Bell, Plus, CircleX } from "lucide-react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { useTasks } from "@/hooks/use-queries";
import Link from "next/link";
import { EmptyTable } from "./components/Empty-Table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data, isLoading, error } = useTasks();

  if (error)
    return (
      <div className="p-6 flex flex-col w-full h-full">
        <EmptyTable
          icon={CircleX}
          title={error.message}
          description="Oops! Something went wrong"
        />
      </div>
    );

  return (
    <div className="w-full">
      <div className="flex w-full flex-col gap-2 border-b">
        <Item className="h-18 py-1 px-4">
          <ItemContent className="">
            <ItemTitle className="text-xl font-bold">Tasks</ItemTitle>
            {isLoading ? (
              <Skeleton className="w-17.5 h-7" />
            ) : (
              <ItemDescription className="text-sm">
                {data.length} totals tasks
              </ItemDescription>
            )}
          </ItemContent>
          <ItemContent className=" flex flex-row justify-center items-center gap-3 mr-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <ItemActions className="">
              {/* Drawer */}
              <Link
                href={"/tasks/new"}
                className="py-2 px-4  cursor-pointer flex items-center gap-1 hover:bg-opacity-80 hover:text-gray-300 rounded bg-black text-white"
              >
                <Plus className="inline mr-2" />
                New Task
              </Link>
              {/* <DrawerAddNewTask /> */}
            </ItemActions>
          </ItemContent>
        </Item>
      </div>
      <div className="p-6 flex flex-col w-full ">{children}</div>
    </div>
  );
}
