import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.client.createMany({
    data: [
      { name: 'Fresenius Medical Care', role: 'Senior Java Developer', accent: 'blue', order: 0 },
      { name: 'Centene Corporation', role: 'Java Developer', accent: 'green', order: 1 },
      { name: 'Liberty Mutual Insurance', role: 'Full Stack Developer', accent: 'purple', order: 2 },
      { name: 'University of Phoenix', role: 'Full Stack Developer', accent: 'orange', order: 3 },
      { name: 'Flipkart', role: 'Java Developer', accent: 'teal', order: 4 }
    ]
  });

  await prisma.testimonial.createMany({
    data: [
      { name: 'Priya Nair', role: 'Engineering Manager', accent: 'blue', quote: "Mubashir consistently shipped reliable, well-tested services — our on-call load dropped noticeably after he joined.", approved: true },
      { name: 'David Chen', role: 'Product Lead', accent: 'green', quote: 'Turns ambiguous requirements into working systems fast. One of the most dependable backend engineers I\u2019ve worked with.', approved: true },
      { name: 'Sara Ahmed', role: 'DevOps Lead', accent: 'purple', quote: 'His CI/CD improvements cut our release cycle time significantly, and his documentation was always spot-on.', approved: true },
      { name: "James O'Connor", role: 'Scrum Master', accent: 'orange', quote: 'Great communicator, a solid mentor to junior developers, and never missed a sprint commitment.', approved: true }
    ]
  });

  await prisma.paymentMethod.createMany({
    data: [
      { label: 'VISA', colorFrom: '#1a1f71', colorTo: '#1a1f71', order: 0 },
      { label: 'mastercard', colorFrom: '#eb001b', colorTo: '#f79e1b', order: 1 },
      { label: 'PhonePe', colorFrom: '#5f259f', colorTo: '#5f259f', order: 2 }
    ]
  });

  console.log('Seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
