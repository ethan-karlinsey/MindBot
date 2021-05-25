from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
import torch


tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")

# Let's chat for 5 lines
HISTORY_SIZE = 3

step = 0
history = []
while True:
    # encode the new user input, add the eos_token and return a tensor in Pytorch
    new_user_input_ids = tokenizer.encode(input(">> User:") + tokenizer.eos_token, return_tensors='pt')
    history.append(new_user_input_ids)
    
    for i in range(max(0, len(history)-HISTORY_SIZE), len(history)):
        if i == max(0, len(history)-HISTORY_SIZE):
            bot_input = history[i]
        else: 
            bot_input = torch.cat([bot_input, history[i]], dim=1)

    # append the new user input tokens to the chat history
    #bot_input_ids = torch.cat([chat_history_ids, new_user_input_ids], dim=-1) if step > 0 else new_user_input_ids

    # generated a response while limiting the total chat history to 1000 tokens, 
    chat_history_ids = model.generate(bot_input, max_length=1000, pad_token_id=tokenizer.eos_token_id)

    bot_line = chat_history_ids[:, bot_input.shape[-1]:][0]

    history.append(bot_line.unsqueeze(0))

    # pretty print last ouput tokens from bot
    print("DialoGPT: {}".format(tokenizer.decode(bot_line, skip_special_tokens=True)))

    step += 1