import { upvote, getTop, redis } from "./leaderboard.js";

async function test() {
  const target = "post:50";

  for (let i = 0; i < 50; i++) {
    await upvote(target);
  }

  const top = await getTop(10);

  const found = top.find((post) => post.id === target);

  if (!found) {
    throw new Error("FAIL ❌ post:50 is not in the top 10");
  }

  if (found.score < 50) {
    throw new Error("FAIL ❌ post:50 score is less than 50");
  }

  console.log("PASS ✅ post:50 reached the top 10");

  redis.disconnect();
}

test().catch((err) => {
  console.error(err);
  redis.disconnect();
  process.exit(1);
});