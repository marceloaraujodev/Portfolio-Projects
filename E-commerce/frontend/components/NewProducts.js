import Center from "./Center";


export default function NewProducts({product}) {
  console.log('this is newProducts in Product prop', product)
  return (
    <>
    <Center>
    <div>{product[0].title}</div>
    </Center>
    </>
  )
}
