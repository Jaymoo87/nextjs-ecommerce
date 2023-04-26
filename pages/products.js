import React from 'react';

import Link from 'next/link';
import Layout from '@/components/Layout';

const Products = () => {
  return (
    <Layout>
      <Link href={'/products/new'} className="btn-primary ">
        Add New Product
      </Link>
    </Layout>
  );
};

export default Products;
