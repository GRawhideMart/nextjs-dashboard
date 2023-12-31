import CardWrapper, { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData, fetchLatestInvoices } from '@/app/lib/data';
import { Suspense } from 'react';
import {
  CardSkeleton,
  LatestInvoicesSkeleton,
  RevenueChartSkeleton,
} from '@/app/ui/skeletons';

export default async function Page() {
  const latestInvoices = await fetchLatestInvoices();
  const {
    totalPaidInvoices,
    totalPendingInvoices,
    numberOfInvoices,
    numberOfCustomers,
  } = await fetchCardData();
  // const [revenuePromise, latestInvoicesPromise, cardDataPromise] =
  //   await Promise.allSettled([
  //     fetchRevenue(),
  //     fetchLatestInvoices(),
  //     fetchCardData(),
  //   ]);

  // const revenue =
  //   revenuePromise.status === 'fulfilled' ? revenuePromise.value : [];
  // const latestInvoices =
  //   latestInvoicesPromise.status === 'fulfilled'
  //     ? latestInvoicesPromise.value
  //     : [];

  // const totalPaidInvoices =
  //   cardDataPromise.status === 'fulfilled'
  //     ? cardDataPromise.value.totalPaidInvoices
  //     : 0;
  // const totalPendingInvoices =
  //   cardDataPromise.status === 'fulfilled'
  //     ? cardDataPromise.value.totalPendingInvoices
  //     : 0;
  // const numberOfInvoices =
  //   cardDataPromise.status === 'fulfilled'
  //     ? cardDataPromise.value.numberOfInvoices
  //     : 0;
  // const numberOfCustomers =
  //   cardDataPromise.status === 'fulfilled'
  //     ? cardDataPromise.value.numberOfCustomers
  //     : 0;

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
