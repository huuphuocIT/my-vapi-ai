export const dynamic = "force-static";

export const ServerComponent = () => {
  const data = (() => {
    const result = [];

    for (let i = 0; i < 5; i++) {
      result.push(<div key={i}>Item {i + 1}</div>);
    }

    return result;
  })();

  return <div>Server Component {data}</div>;
};

export default ServerComponent;

export const metadata = {
  title: "Server Component",
};

export const revalidate = 0;
