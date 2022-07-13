import React, { FC } from 'react';
import {useRouter} from 'next/dist/client/router'
import Link from 'next/link';
import { useQuery } from 'react-query';
import { IPerson } from '@src/lib/interfaces/IPerson';

const getPersonById = async (id: string | string[] | undefined): Promise<IPerson> => {
    if (typeof id === 'string') {
        const res = await fetch(`/api/person/${id}`);
        if (res.ok) {
            return res.json();
        }
        throw new Error('error fetching user with id');
  }
  throw new Error('invalid id');
};

const PersonPage: FC = () => {
    const {
        query: { id },
    } = useRouter();
    const { isLoading, isError, error, data } = useQuery<IPerson, Error>(['person', id], () => getPersonById(id), {
        enabled: !!id,
    });

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

export default getPersonById;
