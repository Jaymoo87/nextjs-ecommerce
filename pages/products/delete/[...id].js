import Layout from '@/components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function DeleteProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const [productInfo, setProductInfo] = useState();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/api/products?id=${id}`).then((res) => {
      setProductInfo(res.data);
    });
  }, [id]);

  const goBack = () => {
    router.push('/products');
  };

  const deleteProduct = async () => {
    await axios.delete(`/api/products?id=${id}`);
    goBack();
  };

  return (
    <Layout>
      <h1 className="text-center">Do you really want to DELETE &nbsp;"{productInfo?.title}"?</h1>
      <div className="flex justify-center gap-2">
        <button onClick={deleteProduct} className="w-32 btn-red">
          Yes
        </button>
        <button className="w-32 btn-primary" onClick={goBack}>
          NO!
        </button>
      </div>
    </Layout>
  );
}
