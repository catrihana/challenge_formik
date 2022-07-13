import { FC } from 'react';
import Link from 'next/link';
import { useQuery, UseQueryResult } from 'react-query';
import { IPerson } from '@src/lib/interfaces/IPerson';

const fetchPerson = async (): Promise<IPerson> => {
  const res = await fetch(`/api/person`);
  if (res.ok) {
    return res.json();
  }
  throw new Error('Network response not ok');
};

const PersonPage: FC = () => {
  const { isLoading, isError, error, data }: UseQueryResult<IPerson, Error> = useQuery<IPerson, Error>(
    'person',
    fetchPerson
  );

  // const { status, error, data }: UseQueryResult<string, Error> = useQuery<string, Error, string, string>(
  //   'person',
  //   async () => {
  //     const res = await fetch('/api/person');
  //     return res.json();
  //   },
  //   {
  //     select: (person) => person.name,
  //   }
  // );

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  if (isError) return <p>Boom boy: Error is -- {error?.message}</p>;

  return (
    <>
      <Link href="/">
        <a>Home</a>
      </Link>
      <p>{data?.userId}</p>
      <p>{data?.id}</p>
      <p>{data?.title}</p>
      <p>{data?.body}</p>
    </>
  );
};

export default PersonPage;