const bcrypt = require('bcrypt');

(async () => {
  const password = "Test1234!";
  const hash = await bcrypt.hash(password, 10);
  console.log("Hash:", hash);

  const isMatch = await bcrypt.compare(password, hash);
  console.log("Match?", isMatch); // should be true
})();