import { PaperAnalysis } from '../types';

export const PRESET_PAPERS: PaperAnalysis[] = [
  {
    id: 'attention-is-all-you-need',
    title: 'Attention Is All You Need',
    authors: 'Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, et al.',
    year: '2017',
    domain: 'Natural Language Processing',
    tags: ['Transformer', 'Self-Attention', 'Sequence Modeling', 'NLP'],
    abstract:
      'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train.',
    problem: 'Sequence models using RNNs are slow and hard to parallelize due to their inherent step-by-step computational dependency across token sequences.',
    method: 'The Transformer architecture, replacing recurrent and convolutional connections entirely with multi-head self-attention mechanisms and positional encodings.',
    results: 'Better translation quality (28.4 BLEU on WMT 2014 En-De) with far less training time (trained in just 3.5 days on 8 GPUs).',
    limitations: 'Memory and computational costs scale quadratically ($O(n^2)$) with sequence length, making very long contexts prohibitive.',
    summary:
      'This foundational paper replaces recurrent and convolutional neural networks with self-attention mechanisms for sequential processing. By decoupling sequence modeling from sequential time steps, it enables unprecedented parallel training on massive text corpora. It established the Transformer architecture that underpins virtually all state-of-the-art modern language models.',
    significance: 'Fundamentally reshaped modern AI by introducing the Transformer backbone used by GPT, Claude, Gemini, and diffusion models.',
    suggestedQuestions: [
      'Why is multi-head attention more expressive than single-head self-attention?',
      'How do sinusoidal positional encodings inform the model of word order?',
      'What led to the quadratic memory bottleneck in long sequence contexts?',
    ],
  },
  {
    id: 'resnet',
    title: 'Deep Residual Learning for Image Recognition',
    authors: 'Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun',
    year: '2015',
    domain: 'Computer Vision',
    tags: ['Residual Networks', 'Skip Connections', 'Deep CNNs', 'ImageNet'],
    abstract:
      'Deeper neural networks are more difficult to train. We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously. We explicitly reformulate the layers as learning residual functions with reference to the layer inputs, instead of learning unreferenced functions. We provide comprehensive empirical evidence showing that these residual networks are easier to optimize, and can gain accuracy from considerably increased depth.',
    problem: 'Very deep neural networks suffer from degradation: as depth increases, training accuracy saturates and degrades rapidly due to optimization hurdles and vanishing/exploding gradients.',
    method: 'Residual (skip) shortcut connections that reformulate stacked layers to learn residual functions $F(x) = H(x) - x$ relative to identity mappings rather than unreferenced mappings.',
    results: 'Won 1st place in ImageNet 2015 with a 3.57% top-5 error rate; enabled the successful, stable training of 152-layer and 1000-layer networks.',
    limitations: 'Parameter count and intermediate memory activation footprints scale up, and basic residual blocks can exhibit feature redundancy across identical stages.',
    summary:
      'The authors resolve the degradation problem preventing the training of ultra-deep convolutional networks by introducing identity skip connections. These shortcut connections allow gradients to flow unimpeded backward through dozens or hundreds of layers during backpropagation. The resulting ResNet architecture won ImageNet 2015 and set the standard for deep network design across vision and beyond.',
    significance: 'Broke the depth barrier in deep learning, proving that deeper networks could be trained effectively without catastrophic gradient degradation.',
    suggestedQuestions: [
      'Why does learning $F(x) + x$ make identity mapping effortless for layers to achieve?',
      'How does ResNet compare to Highway Networks introduced around the same time?',
      'What is the bottleneck block design used in ResNet-50 and ResNet-152?',
    ],
  },
  {
    id: 'bert',
    title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding',
    authors: 'Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova',
    year: '2018',
    domain: 'Natural Language Processing',
    tags: ['Bidirectional', 'Masked LM', 'Pre-training', 'Transfer Learning'],
    abstract:
      'We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers. Unlike recent language representation models, BERT is designed to pre-train deep bidirectional representations from unlabeled text by jointly conditioning on both left and right context in all layers. As a result, the pre-trained BERT model can be fine-tuned with just one additional output layer to create state-of-the-art models for a wide range of tasks.',
    problem: 'Prior pre-trained representations (such as OpenAI GPT and ELMo) were unidirectional or shallowly concatenated, preventing tokens from attending to both left and right context simultaneously.',
    method: 'Pre-training a deep bidirectional Transformer encoder using two self-supervised tasks: Masked Language Modeling (predicting 15% masked tokens) and Next Sentence Prediction.',
    results: 'Substantially outperformed prior state-of-the-art across 11 NLP tasks, setting new records on GLUE (80.5%), MultiNLI (86.7%), and SQuAD v1.1 F1 (93.2).',
    limitations: 'High computational requirements for pre-training from scratch, and a minor discrepancy between pre-training (involving artificial [MASK] tokens) and downstream fine-tuning.',
    summary:
      'BERT introduces a deep bidirectional pre-training paradigm for language models using masked token prediction instead of sequential autoregression. This enables each token representation to encode contextual clues simultaneously from preceding and subsequent text across all encoder layers. Once pre-trained on massive unlabeled corpora, BERT can be fine-tuned with a simple classification layer to achieve landmark results across diverse NLP benchmarks.',
    significance: 'Demonstrated that bidirectional self-supervised pre-training followed by fine-tuning yields superior representation power for language understanding.',
    suggestedQuestions: [
      'Why can standard autoregressive language models like GPT not easily incorporate right-to-left context without leaking target tokens?',
      'What role did the Next Sentence Prediction (NSP) objective play, and why did later papers like RoBERTa remove it?',
      'How does BERT tokenize out-of-vocabulary words using WordPiece?',
    ],
  },
  {
    id: 'flash-attention',
    title: 'FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness',
    authors: 'Tri Dao, Daniel Y. Fu, Stefano Ermon, Atri Rudra, Christopher Ré',
    year: '2022',
    domain: 'Systems & Efficiency',
    tags: ['SRAM Optimization', 'IO-Aware', 'Hardware Acceleration', 'Transformers'],
    abstract:
      'Transformers are slow and memory-intensive on long sequences, as the time and memory complexity of self-attention are quadratic in sequence length. Approximate attention methods have attempted to address this, but often trade off model quality. We propose FlashAttention, an IO-aware exact attention algorithm that uses tiling to reduce the number of memory reads/writes between GPU high bandwidth memory (HBM) and GPU on-chip SRAM.',
    problem: 'Standard self-attention materializes the full $N \times N$ attention matrix into slow GPU High Bandwidth Memory (HBM), resulting in severe memory bandwidth bottlenecks and quadratic memory scaling.',
    method: 'Tiling attention computations into SRAM blocks and computing softmax incrementally via online softmax scaling, preventing materialization of intermediate attention matrices in HBM.',
    results: '2-4x wall-clock speedup for training standard Transformers and up to 10x memory reduction, enabling 8K+ context length training on standard GPUs without approximations.',
    limitations: 'Requires hardware-specific CUDA kernel implementations tailored to GPU SRAM architectures and arithmetic characteristics.',
    summary:
      'FlashAttention tackles the speed and memory bottlenecks of Transformer attention by making the algorithm aware of GPU memory hierarchies. Instead of reading and writing the massive quadratic attention matrix to slow high-bandwidth memory, it tiles operations into fast on-chip SRAM using online softmax. This yields dramatic speedups and memory savings while computing mathematically exact attention with zero loss in model accuracy.',
    significance: 'Became an indispensable industry standard in deep learning infrastructure, powering virtually all modern LLM training and inference frameworks.',
    suggestedQuestions: [
      'How does the online softmax trick allow normalizing exponentiated dot products without the entire row sum known in advance?',
      'Why is memory IO (bandwidth) frequently a larger bottleneck than FLOP compute in modern GPUs?',
      'What are the key architectural enhancements introduced in FlashAttention-2 and FlashAttention-3?',
    ],
  },
  {
    id: 'lora',
    title: 'LoRA: Low-Rank Adaptation of Large Language Models',
    authors: 'Edward J. Hu, Yelong Shen, Phillip Wallis, Zeyuan Allen-Zhu, et al.',
    year: '2021',
    domain: 'Parameter-Efficient Fine-Tuning',
    tags: ['PEFT', 'Low-Rank', 'Fine-Tuning', 'LLM Efficiency'],
    abstract:
      'An important paradigm of natural language processing consists of large-scale pre-training on general domain data and adaptation to specific tasks. Full fine-tuning becomes prohibitive as models grow to hundreds of billions of parameters. We propose Low-Rank Adaptation, or LoRA, which freezes the pre-trained model weights and injects trainable rank decomposition matrices into each layer of the Transformer architecture.',
    problem: 'Full parameter fine-tuning of massive billion-parameter models is computationally expensive, requires enormous VRAM, and necessitates deploying completely separate large weight checkpoints for each downstream task.',
    method: 'Freezes base model weights and decomposes weight update matrices $\Delta W$ into low-rank factorized pairs: $\Delta W = B \times A$, where $B \in \mathbb{R}^{d \times r}$ and $A \in \mathbb{R}^{r \times k}$ with rank $r \ll \min(d, k)$.',
    results: 'Matches or exceeds full fine-tuning performance on GPT-3 175B while reducing trainable parameters by up to 10,000x and GPU memory footprint by 3x, with zero added inference latency.',
    limitations: 'Choosing the optimal rank $r$ and target modules can require empirical tuning, and serving batches with mixed dynamic task adapters requires specialized runtime engines.',
    summary:
      'This paper introduces Low-Rank Adaptation (LoRA) to make adapting massive foundation models practical on modest hardware. By freezing the pre-trained weights and training only compact low-rank matrix pairs for attention layers, it slashes trainable parameters by orders of magnitude. The learned weight deltas can be merged directly back into the base weights, adding zero latency during deployment.',
    significance: 'Democratized open-source LLM customization, empowering individual researchers and startups to fine-tune giant foundation models on consumer GPUs.',
    suggestedQuestions: [
      'Why can the intrinsic rank of parameter updates be so small ($r=4$ or $r=8$) without hurting performance?',
      'How does LoRA achieve zero added inference latency when serving a single task?',
      'How does QLoRA build on this idea to enable 4-bit quantized base model adaptation?',
    ],
  },
  {
    id: 'alphago',
    title: 'Mastering the Game of Go with Deep Neural Networks and Tree Search',
    authors: 'David Silver, Aja Huang, Chris J. Maddison, Arthur Guez, et al.',
    year: '2016',
    domain: 'Reinforcement Learning',
    tags: ['AlphaGo', 'MCTS', 'Deep RL', 'Policy Networks', 'Value Networks'],
    abstract:
      'The game of Go has long been viewed as the most challenging of classic games for artificial intelligence owing to its enormous search space and the difficulty of evaluating board positions. Here we introduce a new approach to computer Go that uses value networks to evaluate board positions and policy networks to select moves. These deep neural networks are trained through supervised learning and reinforcement learning.',
    problem: 'Go has an immense search tree factor ($b \approx 250$) and depth ($d \approx 150$) with subtle, non-calculable global position values, making traditional minimax and brute-force search ineffective.',
    method: 'Combines Monte Carlo Tree Search (MCTS) with deep neural networks: policy networks to narrow move selection and value networks to evaluate board positions without tree rollouts.',
    results: 'Achieved a 99.8% win rate against other Go programs and defeated 18-time human World Champion Lee Sedol 4-1 in a historic televised match.',
    limitations: 'Initial version required substantial bootstrapping from human expert game databases (160,000 games) and massive distributed GPU/TPU compute clusters.',
    summary:
      'DeepMind researchers solved the grand challenge of computer Go by fusing deep neural networks with Monte Carlo Tree Search. One set of networks selects promising moves to prune search breadth, while value networks predict winning probabilities to truncate search depth. This breakthrough defeated the reigning human world champion in a domain once thought decades away from AI mastery.',
    significance: 'Historic watershed moment in artificial intelligence, proving deep reinforcement learning could conquer intuition-heavy strategic domains.',
    suggestedQuestions: [
      'How did policy rollouts balance exploration and exploitation inside the MCTS simulation phase?',
      'What architectural shifts allowed AlphaGo Zero to subsequently learn entirely from scratch without human games?',
      'How was the value network trained to avoid overfitting to self-play correlation?',
    ],
  },
];
