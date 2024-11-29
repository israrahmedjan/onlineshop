import React from "react";

const EmailTemplate = ({ firstName }) => (
  <>
  {/* <div>
    <h1>Welcome, {firstName}!</h1>
  </div> */}
  <Section className="my-[16px]">
 
  <Section className="mt-[32px] text-center">
    <Text className="m-[16px] text-[18px] font-semibold leading-[28px] text-indigo-600">
      Classic Watches
    </Text>
    <Heading
      as="h1"
      className="text-[36px] font-semibold leading-[40px] tracking-tight text-gray-900"
    >
      Elegant Comfort
    </Heading>
    <Text className="mt-[8px] text-[16px] leading-[24px] text-gray-500">
      Dieter Rams’ work has an outstanding quality which distinguishes it from
      the vast majority of industrial design of the entire 20th Century.
    </Text>
    <Text className="text-[16px] font-semibold leading-[24px] text-gray-900">
      $210.00
    </Text>
    <Button
      className="mt-[16px] rounded-[8px] bg-indigo-600 px-[24px] py-[12px] font-semibold text-white"
      href="https://react.email"
    >
      Buy now
    </Button>
  </Section>
</Section>
</>
);

export default EmailTemplate;
