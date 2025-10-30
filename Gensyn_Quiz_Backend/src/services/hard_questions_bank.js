export const hardQuestionBank = [
  {
    id: 1,
    question:
      "What is the core trade-off of using probabilistic checks in Proof-of-Learning?",
    options: [
      "Trading token value for faster transaction speeds.",
      "Trading ease of use for stronger security against all attacks.",
      "Trading absolute certainty for massive gains in verification efficiency.",
      "Trading higher latency for increased network decentralization.",
    ],
    answer:
      "Trading absolute certainty for massive gains in verification efficiency.",
  },
  {
    id: 2,
    question:
      "Why build Gensyn as a custom rollup instead of just deploying contracts on Ethereum?",
    options: [
      "Ethereum's high cost and low throughput are prohibitive for a compute scheduler.",
      "Ethereum does not support the programming languages needed for ML.",
      "A rollup architecture is inherently more secure than a standard L1.",
      "It is impossible to create a new staking token on the Ethereum network.",
    ],
    answer:
      "Ethereum's high cost and low throughput are prohibitive for a compute scheduler.",
  },
  {
    id: 3,
    question:
      "What is the primary defense against a collusion attack between Solvers and Verifiers?",
    options: [
      "An AI system that monitors all network behavior for collusion.",
      "A random, global assignment of Verifiers, making it statistically expensive to control a majority.",
      "A requirement for all Verifiers to submit video proof of their identity.",
      "Making the verification code open-source so anyone can spot the attack.",
    ],
    answer:
      "A random, global assignment of Verifiers, making it statistically expensive to control a majority.",
  },
  {
    id: 4,
    question:
      "Why is verifying a non-deterministic training process a fundamental challenge?",
    options: [
      "The network's token cannot handle the complexity of random numbers.",
      "Such processes are illegal for use in decentralized computations.",
      "Verification relies on reproducing an exact computational path, which is impossible if the path is random.",
      "It requires an impractical amount of RAM for the Verifiers to process.",
    ],
    answer:
      "Verification relies on reproducing an exact computational path, which is impossible if the path is random.",
  },
  {
    id: 5,
    question:
      "What is the 'data availability problem' in the context of a Gensyn Verifier?",
    options: [
      "The Verifier's internet connection is too slow to download the model.",
      "The Submitter deletes the source data before the task is complete.",
      "The Verifier cannot find any available tasks to work on.",
      "The Verifier must be able to access the original data to validate a proof, and ensuring this access is a challenge.",
    ],
    answer:
      "The Verifier must be able to access the original data to validate a proof, and ensuring this access is a challenge.",
  },
  {
    id: 6,
    question:
      "How does Gensyn's trust model differ from a system using Trusted Execution Environments (TEEs)?",
    options: [
      "Gensyn's software-based approach is inherently less secure than TEEs.",
      "Gensyn uses crypto-economic proofs, while TEEs trust hardware manufacturers.",
      "Gensyn requires complete trust in the Solver, whereas TEEs do not.",
      "TEEs are an older, outdated technology incompatible with modern GPUs.",
    ],
    answer:
      "Gensyn uses crypto-economic proofs, while TEEs trust hardware manufacturers.",
  },
  {
    id: 7,
    question:
      "What is the main consequence of high latency in a parallelized training task?",
    options: [
      "It increases the security of the network by slowing down attackers.",
      "It creates bottlenecks as nodes wait for updates, making training inefficient.",
      "The cost of the compute task will automatically decrease.",
      "The final model will train faster but be less accurate.",
    ],
    answer:
      "It creates bottlenecks as nodes wait for updates, making training inefficient.",
  },
  {
    id: 8,
    question:
      "What is the most immediate security risk if the Gensyn token's value drops dramatically?",
    options: [
      "The cost of attacking the network (e.g., bribing Verifiers) becomes economically rational.",
      "The network would become faster due to significantly less traffic.",
      "The protocol would automatically shut down to prevent further losses.",
      "The price of compute would permanently increase to compensate.",
    ],
    answer:
      "The cost of attacking the network (e.g., bribing Verifiers) becomes economically rational.",
  },
  {
    id: 9,
    question:
      "How does Gensyn's model fundamentally differ from Federated Learning?",
    options: [
      "Gensyn is centralized, while Federated Learning is decentralized.",
      "Gensyn is a general compute market; Federated Learning is a specific privacy technique where data stays local.",
      "Gensyn sends the model to the data, while Federated Learning sends data to the model.",
      "There is no fundamental difference; they are identical concepts.",
    ],
    answer:
      "Gensyn is a general compute market; Federated Learning is a specific privacy technique where data stays local.",
  },
  {
    id: 10,
    question:
      "The Proof-of-Learning system is only viable if its computational overhead is...",
    options: [
      "Zero.",
      "Equal to the time it takes to do the computation itself.",
      "A small, acceptable fraction of the main computational work.",
      "At least double the original computation time to ensure security.",
    ],
    answer: "A small, acceptable fraction of the main computational work.",
  },
  {
    id: 11,
    question:
      "In a dispute on the Gensyn L2, what is the role of the Ethereum L1?",
    options: [
      "The L1 has no role and cannot intervene in L2 disputes.",
      "The Gensyn team asks Ethereum's developers to manually fix the issue.",
      "The L1 acts as the ultimate arbiter, where fraud proofs are settled to slash attackers.",
      "The L1 would automatically roll back the entire Gensyn chain to a previous state.",
    ],
    answer:
      "The L1 acts as the ultimate arbiter, where fraud proofs are settled to slash attackers.",
  },
  {
    id: 12,
    question:
      "Why is a simple hash of the final model an insufficient proof of work?",
    options: [
      "The file size of most models is too large to be hashed.",
      "Hashing algorithms are not considered secure for this purpose.",
      "It's too computationally expensive to hash a large model file.",
      "The hash doesn't prove the *process*; an attacker could just present a pre-computed model.",
    ],
    answer:
      "The hash doesn't prove the *process*; an attacker could just present a pre-computed model.",
  },
  {
    id: 13,
    question:
      "What extra challenge does Reinforcement Learning (RL) pose for verification?",
    options: [
      "RL models are too large to be verified by the protocol.",
      "The proof must validate not just the model, but also its interactions with a stateful environment.",
      "RL training is less computationally intensive, making it not worth verifying.",
      "RL models cannot be parallelized, which conflicts with the network design.",
    ],
    answer:
      "The proof must validate not just the model, but also its interactions with a stateful environment.",
  },
  {
    id: 14,
    question:
      "Why is the required stake for a Verifier lower than for a Solver?",
    options: [
      "Solvers are inherently less trustworthy than Verifiers.",
      "Verification is less work, so the reward is lower, and the stake must be proportional to the reward.",
      "Verifiers are required to own more tokens overall to join the network.",
      "There is no difference in the required stake; they are identical.",
    ],
    answer:
      "Verification is less work, so the reward is lower, and the stake must be proportional to the reward.",
  },
  {
    id: 15,
    question:
      "What is a primary risk of a 'fair ordering' problem in the job scheduler?",
    options: [
      "An unfair scheduler could process jobs in alphabetical order.",
      "An unfair scheduler could process only one job at a time.",
      "An unfair scheduler could randomly assign jobs to any Solver.",
      "A scheduler could be exploited to front-run jobs or censor users.",
    ],
    answer: "A scheduler could be exploited to front-run jobs or censor users.",
  },
  {
    id: 16,
    question:
      "What is required to add support for a new, fundamentally different GPU architecture?",
    options: [
      "The owner of the new GPU just needs to download a new driver.",
      "Such hardware would be automatically banned from the network.",
      "A network-wide hard fork to update the protocol's core validation rules.",
      "No update is needed; the protocol works on all hardware automatically.",
    ],
    answer:
      "A network-wide hard fork to update the protocol's core validation rules.",
  },
  {
    id: 17,
    question:
      "How are gradients synchronized from hundreds of Solvers without a central server?",
    options: [
      "Synchronization is not necessary for parallel training.",
      "Each Solver emails their gradient updates to the Submitter.",
      "All updates are written directly to the Ethereum blockchain.",
      "The protocol uses a P2P layer and algorithms like ring-allreduce.",
    ],
    answer: "The protocol uses a P2P layer and algorithms like ring-allreduce.",
  },
  {
    id: 18,
    question:
      "What is the primary bottleneck for the scalability of the Gensyn network?",
    options: [
      "The total number of available GPUs in the world.",
      "The market capitalization of the native token.",
      "The speed of light, which limits data transfer rates.",
      "The throughput and consensus limitations of the L1 settlement layer.",
    ],
    answer:
      "The throughput and consensus limitations of the L1 settlement layer.",
  },
  {
    id: 19,
    question: "A 'time-bandit' attack on the Gensyn scheduler would involve...",
    options: [
      "Setting the clock on the Solver's machine back to reduce billing.",
      "Submitting a compute job that runs for an infinitely long time.",
      "Reordering transactions in a block to capture arbitrage from job bids.",
      "Stealing computational time from other users' active jobs.",
    ],
    answer:
      "Reordering transactions in a block to capture arbitrage from job bids.",
  },
  {
    id: 20,
    question:
      "Why is 'payment finality' a critical security assumption for Solvers?",
    options: [
      "Reversible transactions are too slow for a high-speed network.",
      "If payments can be reversed, Solvers have no guarantee of reward, destroying the incentive to participate.",
      "Finality is a concept that only applies to Bitcoin, not L2s.",
      "It would make the blockchain's total file size too large.",
    ],
    answer:
      "If payments can be reversed, Solvers have no guarantee of reward, destroying the incentive to participate.",
  },
  {
    id: 21,
    question:
      "How could a malicious actor exploit Maximal Extractable Value (MEV) in the task scheduler?",
    options: [
      "By submitting many tasks that are designed to fail.",
      "By creating multiple Solver identities to get more work.",
      "By front-running or sandwiching bids for high-value compute tasks.",
      "By using older, less efficient hardware to solve tasks.",
    ],
    answer:
      "By front-running or sandwiching bids for high-value compute tasks.",
  },
  {
    id: 22,
    question:
      "What is the main difficulty in slashing a Solver for a legitimate hardware failure?",
    options: [
      "The token price is too volatile to calculate a fair penalty.",
      "There are too many different types of hardware to monitor.",
      "The on-chain proof of a *genuine* failure is hard to distinguish from a *malicious* one.",
      "Smart contracts cannot handle such complex exception logic.",
    ],
    answer:
      "The on-chain proof of a *genuine* failure is hard to distinguish from a *malicious* one.",
  },
  {
    id: 23,
    question:
      "What is the primary benefit of a ZK-Rollup architecture over an Optimistic one for Gensyn?",
    options: [
      "The network would become more decentralized.",
      "Transaction costs would significantly increase.",
      "Verification finality would be near-instant, removing the long challenge period.",
      "It would allow for much larger AI models to be trained.",
    ],
    answer:
      "Verification finality would be near-instant, removing the long challenge period.",
  },
  {
    id: 24,
    question: "How does a 'Griefing Attack' manifest in the Gensyn ecosystem?",
    options: [
      "A Solver intentionally slows down their computation to annoy the Submitter.",
      "A participant spams the network with thousands of very small, useless tasks.",
      "A Submitter tricks a Solver into losing their stake on a failed job at minimal cost to themselves.",
      "A Verifier deliberately challenges every single valid proof submitted to the network.",
    ],
    answer:
      "A Submitter tricks a Solver into losing their stake on a failed job at minimal cost to themselves.",
  },
  {
    id: 25,
    question:
      "What is the 'Verifier's Dilemma' as it applies to the Gensyn protocol?",
    options: [
      "Verifiers have too many proofs to check in the given time limit.",
      "Verifiers must choose between using a CPU or a GPU for checks.",
      "A rational Verifier might approve a proof without checking it to save on compute costs.",
      "Verifiers do not earn enough rewards to justify their participation.",
    ],
    answer:
      "A rational Verifier might approve a proof without checking it to save on compute costs.",
  },
  {
    id: 26,
    question:
      "How could a Sybil attack compromise the Proof-of-Learning mechanism?",
    options: [
      "By creating many Submitter accounts to get lower prices.",
      "By creating numerous Verifier nodes to be selected to approve one's own fraudulent work.",
      "By using multiple Solver nodes to finish a job faster.",
      "By overwhelming the network's Discord server with fake user accounts.",
    ],
    answer:
      "By creating numerous Verifier nodes to be selected to approve one's own fraudulent work.",
  },
  {
    id: 27,
    question:
      "What is the main obstacle to verifying training on confidential datasets?",
    options: [
      "The models themselves are too complex to verify.",
      "Verification needs data access, but privacy-preserving methods like FHE are too slow.",
      "Solvers would refuse to work with confidential data.",
      "It is illegal to use proprietary data for any AI training.",
    ],
    answer:
      "Verification needs data access, but privacy-preserving methods like FHE are too slow.",
  },
  {
    id: 28,
    question:
      "What is the 'Oracle Problem' in the context of Gensyn's marketplace?",
    options: [
      "The protocol cannot solve complex mathematical problems.",
      "The protocol needs a secure way to fetch external data, like the USD price of compute.",
      "Verifiers cannot communicate with each other.",
      "The documentation is too difficult to understand.",
    ],
    answer:
      "The protocol needs a secure way to fetch external data, like the USD price of compute.",
  },
  {
    id: 29,
    question: "In distributed training, what is the 'tail latency' problem?",
    options: [
      "The time it takes for the last bit of data to be transmitted.",
      "The overall task performance being bottlenecked by the slowest single Solver.",
      "The delay at the end of the job before payment is processed.",
      "The 'long tail' of available, but slow, hardware on the network.",
    ],
    answer:
      "The overall task performance being bottlenecked by the slowest single Solver.",
  },
  {
    id: 30,
    question:
      "What is the main challenge of 'state synchronization' for a new Solver joining a job?",
    options: [
      "Downloading the initial training script.",
      "Verifying their identity with the network.",
      "Efficiently loading the massive, multi-gigabyte model state without stalling the network.",
      "Finding the correct IP address of the other Solvers.",
    ],
    answer:
      "Efficiently loading the massive, multi-gigabyte model state without stalling the network.",
  },
  {
    id: 31,
    question:
      "Why is verifying 'fine-tuning' harder than verifying training from scratch?",
    options: [
      "Fine-tuning uses less data, which is harder to track.",
      "The proof must incorporate the massive initial state of the pre-trained model.",
      "The resulting model is smaller and harder to verify.",
      "Fine-tuning is a more centralized process by nature.",
    ],
    answer:
      "The proof must incorporate the massive initial state of the pre-trained model.",
  },
  {
    id: 32,
    question:
      "What attack involves isolating a node so it accepts a false version of the blockchain?",
    options: [
      "A DDoS attack.",
      "A phishing attack.",
      "An Eclipse attack.",
      "A Sybil attack.",
    ],
    answer: "An Eclipse attack.",
  },
  {
    id: 33,
    question:
      "How does a high 'token velocity' problem impact Gensyn's security?",
    options: [
      "It makes transactions process too quickly.",
      "If users instantly sell tokens, the stake value (market cap) drops, reducing network security.",
      "It would increase the total supply of the token, causing inflation.",
      "It would centralize the token ownership among traders.",
    ],
    answer:
      "If users instantly sell tokens, the stake value (market cap) drops, reducing network security.",
  },
  {
    id: 34,
    question: "What is the primary challenge of a contentious hard fork?",
    options: [
      "Choosing a new name for the forked chain.",
      "Getting the community (users, solvers) to agree on one version to avoid splitting the network.",
      "Finding enough disk space to store two versions of the blockchain.",
      "Updating all the public documentation and guides.",
    ],
    answer:
      "Getting the community (users, solvers) to agree on one version to avoid splitting the network.",
  },
  {
    id: 35,
    question:
      "Why is a probabilistic proof incompatible with a deterministic financial calculation?",
    options: [
      "Financial calculations are too simple for the network.",
      "The protocol only accepts AI models, not financial ones.",
      "Probabilistic proofs allow a tiny chance of error, which is unacceptable for finance.",
      "Banks do not accept payments from cryptocurrency protocols.",
    ],
    answer:
      "Probabilistic proofs allow a tiny chance of error, which is unacceptable for finance.",
  },
  {
    id: 36,
    question:
      "How must a 'dispute resolution' between a Solver and Submitter be handled in a trustless system?",
    options: [
      "By appealing to the Gensyn customer support team.",
      "By a deterministic, on-chain mechanism that can assign fault.",
      "By a public vote of all token holders.",
      "By having both parties' stakes slashed as a penalty.",
    ],
    answer: "By a deterministic, on-chain mechanism that can assign fault.",
  },
  {
    id: 37,
    question:
      "How does blockchain 'data sharding' present a challenge for large ML workloads?",
    options: [
      "Sharding makes the network more centralized.",
      "A single ML job may need data from multiple shards, creating immense communication overhead.",
      "Sharding is not compatible with smart contracts.",
      "It would reduce the total amount of data that can be stored.",
    ],
    answer:
      "A single ML job may need data from multiple shards, creating immense communication overhead.",
  },
  {
    id: 38,
    question:
      "What currently prevents a Solver from stealing a Submitter's proprietary model architecture?",
    options: [
      "The model is encrypted and the Solver never sees the architecture.",
      "The Solver must sign a legally binding Non-Disclosure Agreement.",
      "This is a trust assumption; the system relies on social and legal deterrents, not cryptographic ones.",
      "The protocol automatically deletes the model from the Solver's machine.",
    ],
    answer:
      "This is a trust assumption; the system relies on social and legal deterrents, not cryptographic ones.",
  },
  {
    id: 39,
    question:
      "What is the resource difference between generating and verifying a ZK-SNARK proof?",
    options: [
      "Verifying is intensive, while generating is trivial.",
      "Generating is extremely intensive, while verifying is trivial and fast.",
      "Both processes have identical computational requirements.",
      "SNARKs do not require generation or verification.",
    ],
    answer:
      "Generating is extremely intensive, while verifying is trivial and fast.",
  },
  {
    id: 40,
    question:
      "What is the negative economic externality of a highly competitive verification market?",
    options: [
      "The network becomes more secure.",
      "A 'race to the bottom' on fees could make verification unprofitable, weakening network security.",
      "The cost of compute for Submitters would increase.",
      "Only the most powerful hardware could participate.",
    ],
    answer:
      "A 'race to the bottom' on fees could make verification unprofitable, weakening network security.",
  },
  {
    id: 41,
    question:
      "How could a 'governance attack' be mounted against the Gensyn protocol?",
    options: [
      "By submitting a very large number of compute jobs at once.",
      "By acquiring a token majority to pass a malicious proposal, e.g., to alter slashing penalties.",
      "By hacking the Discord server and impersonating a developer.",
      "By creating a competing decentralized compute protocol.",
    ],
    answer:
      "By acquiring a token majority to pass a malicious proposal, e.g., to alter slashing penalties.",
  },
  {
    id: 42,
    question:
      "Why is 'gradient accumulation' a useful technique for training on Gensyn?",
    options: [
      "It increases the amount of data needed for training.",
      "It allows Solvers to process data locally and communicate less frequently, reducing network dependency.",
      "It makes the model less accurate but faster to train.",
      "It is a method for verifying the final model.",
    ],
    answer:
      "It allows Solvers to process data locally and communicate less frequently, reducing network dependency.",
  },
  {
    id: 43,
    question:
      "What tension exists between blockchain transparency and commercial AI privacy?",
    options: [
      "Commercial AI companies do not use blockchains.",
      "Public on-chain metadata (e.g., job size, frequency) can leak sensitive business intelligence.",
      "Blockchains are inherently slow, while commercial development is fast.",
      "There is no tension; transparency is always good for business.",
    ],
    answer:
      "Public on-chain metadata (e.g., job size, frequency) can leak sensitive business intelligence.",
  },
  {
    id: 44,
    question:
      "What would be the consequence if Proof-of-Learning was found to be 'ASIC-friendly'?",
    options: [
      "The network would be more efficient.",
      "Specialized hardware could outperform GPUs, leading to centralization of Solvers and Verifiers.",
      "The network would consume less energy.",
      "More people would be able to participate in the network.",
    ],
    answer:
      "Specialized hardware could outperform GPUs, leading to centralization of Solvers and Verifiers.",
  },
  {
    id: 45,
    question:
      "What is a 'dark forest' problem in the context of the Gensyn job mempool?",
    options: [
      "The network is not environmentally friendly.",
      "It's a place where failed transactions go.",
      "Visible, profitable jobs in the mempool can be front-run by sophisticated actors.",
      "The documentation is incomplete, leaving users in the dark.",
    ],
    answer:
      "Visible, profitable jobs in the mempool can be front-run by sophisticated actors.",
  },
  {
    id: 46,
    question:
      "Why is using Fully Homomorphic Encryption (FHE) for training a large neural network currently infeasible?",
    options: [
      "FHE is not secure enough for AI models.",
      "The massive computational overhead of FHE would make training orders of magnitude slower.",
      "FHE only works on text data, not images or other modalities.",
      "The FHE algorithms are proprietary and not available for use.",
    ],
    answer:
      "The massive computational overhead of FHE would make training orders of magnitude slower.",
  },
  {
    id: 47,
    question:
      "How does 'Amdahl's Law' apply to optimizing a parallelized training job on Gensyn?",
    options: [
      "It proves that decentralization is always faster.",
      "It states that total speedup is limited by the sequential (non-parallel) part of the task.",
      "It is a law governing the price of the Gensyn token.",
      "It defines the maximum number of Solvers that can work on a task.",
    ],
    answer:
      "It states that total speedup is limited by the sequential (non-parallel) part of the task.",
  },
  {
    id: 48,
    question:
      "What is the 'Fisherman's Dilemma' in an optimistic rollup design?",
    options: [
      "A participant must decide if the reward for challenging a fraudulent transaction outweighs the cost and risk.",
      "Solvers cannot decide which jobs to work on.",
      "There are too many jobs, like fish in the sea.",
      "The network's security relies on active fishing.",
    ],
    answer:
      "A participant must decide if the reward for challenging a fraudulent transaction outweighs the cost and risk.",
  },
  {
    id: 49,
    question:
      "What challenge does 'gradient sparsification' create for the Proof-of-Learning mechanism?",
    options: [
      "It makes the model converge faster.",
      "The verification protocol must be able to correctly handle and validate these sparse, compressed updates.",
      "It increases the cost of training.",
      "The model becomes less accurate.",
    ],
    answer:
      "The verification protocol must be able to correctly handle and validate these sparse, compressed updates.",
  },
  {
    id: 50,
    question:
      "What is the fundamental limitation of using a 'reputation score' as the primary security for Solvers?",
    options: [
      "Reputation scores are too complex to calculate.",
      "An attacker can build a high reputation slowly before launching a high-value attack ('long con').",
      "It is impossible to store a reputation score on a blockchain.",
      "Users do not trust reputation scores.",
    ],
    answer:
      "An attacker can build a high reputation slowly before launching a high-value attack ('long con').",
  },
];


