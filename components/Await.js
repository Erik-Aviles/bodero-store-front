export default async function Await({ promise, children }) {
  let data = await promise;
  console.log(`Esto es el resultdo: ${data}`);
  return <>{children(data)}</>;
}
