(function () {
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function button(className, text) {
    const node = el("button", className, text);
    node.type = "button";
    return node;
  }

  function renderChoiceList(puzzle, multi, onChange) {
    const state = multi ? [] : null;
    const grid = el("div", "option-grid");
    puzzle.options.forEach((option, index) => {
      const card = button("choice-card", option);
      card.setAttribute("aria-pressed", "false");
      card.addEventListener("click", () => {
        if (multi) {
          const existing = state.indexOf(index);
          if (existing >= 0) state.splice(existing, 1);
          else state.push(index);
          card.classList.toggle("selected", state.includes(index));
          card.setAttribute("aria-pressed", String(state.includes(index)));
          onChange([...state]);
        } else {
          grid.querySelectorAll(".choice-card").forEach((item) => {
            item.classList.remove("selected");
            item.setAttribute("aria-pressed", "false");
          });
          card.classList.add("selected");
          card.setAttribute("aria-pressed", "true");
          onChange(index);
        }
      });
      grid.append(card);
    });
    return grid;
  }

  function renderOrder(puzzle, onChange) {
    const order = puzzle.items.map((_item, index) => index);
    const list = el("div", "sort-list");

    function paint() {
      list.innerHTML = "";
      order.forEach((itemIndex, position) => {
        const row = el("div", "sortable-item");
        row.tabIndex = 0;
        row.draggable = true;
        row.dataset.index = String(itemIndex);
        row.append(el("span", "status-pill", String(position + 1)));
        row.append(el("span", "", puzzle.items[itemIndex]));
        const controls = el("span", "mini-controls");
        const up = button("", "↑");
        const down = button("", "↓");
        up.setAttribute("aria-label", "Move item up");
        down.setAttribute("aria-label", "Move item down");
        up.disabled = position === 0;
        down.disabled = position === order.length - 1;
        up.addEventListener("click", () => move(position, position - 1));
        down.addEventListener("click", () => move(position, position + 1));
        controls.append(up, down);
        row.append(controls);
        row.addEventListener("dragstart", (event) => {
          event.dataTransfer.setData("text/plain", String(position));
        });
        row.addEventListener("dragover", (event) => event.preventDefault());
        row.addEventListener("drop", (event) => {
          event.preventDefault();
          move(Number(event.dataTransfer.getData("text/plain")), position);
        });
        list.append(row);
      });
      onChange([...order]);
    }

    function move(from, to) {
      if (to < 0 || to >= order.length) return;
      const [item] = order.splice(from, 1);
      order.splice(to, 0, item);
      paint();
    }

    paint();
    return list;
  }

  function renderCategorise(puzzle, onChange) {
    const assignments = puzzle.items.map(() => null);
    const wrap = el("div", "grid");
    const bank = el("div", "token-bank");
    const buckets = el("div", "bucket-grid");

    function emit() {
      onChange([...assignments]);
    }

    puzzle.items.forEach((item, index) => {
      const token = button("draggable-token", item);
      token.draggable = true;
      token.dataset.item = String(index);
      token.addEventListener("dragstart", (event) => event.dataTransfer.setData("text/plain", String(index)));
      bank.append(token);
    });

    puzzle.buckets.forEach((bucketName, bucketIndex) => {
      const bucket = el("div", "bucket");
      bucket.tabIndex = 0;
      bucket.append(el("h4", "", bucketName));
      const contents = el("div", "bucket-items");
      bucket.append(contents);
      bucket.addEventListener("dragover", (event) => event.preventDefault());
      bucket.addEventListener("drop", (event) => {
        event.preventDefault();
        const itemIndex = Number(event.dataTransfer.getData("text/plain"));
        const token = wrap.querySelector(`[data-item="${itemIndex}"]`);
        assignments[itemIndex] = bucketIndex;
        contents.append(token);
        emit();
      });
      bucket.addEventListener("click", () => {
        const selected = wrap.querySelector(".draggable-token.selected");
        if (!selected) return;
        const itemIndex = Number(selected.dataset.item);
        selected.classList.remove("selected");
        assignments[itemIndex] = bucketIndex;
        contents.append(selected);
        emit();
      });
      buckets.append(bucket);
    });

    bank.addEventListener("click", (event) => {
      const token = event.target.closest(".draggable-token");
      if (!token) return;
      wrap.querySelectorAll(".draggable-token").forEach((item) => item.classList.remove("selected"));
      token.classList.add("selected");
    });

    wrap.append(el("p", "helper", "Drag a tile into a bucket, or tap a tile and then tap its bucket."), bank, buckets);
    return wrap;
  }

  function renderHotspot(puzzle, onChange) {
    const selected = [];
    const wrap = el("div", "hotspot-wrap");
    const img = el("img");
    img.src = puzzle.image;
    img.alt = puzzle.prompt;
    wrap.append(img);
    puzzle.regions.forEach((region) => {
      const spot = button("hotspot-button", "");
      spot.style.left = `${(region.x / 300) * 100}%`;
      spot.style.top = `${(region.y / 220) * 100}%`;
      spot.style.width = `${(region.w / 300) * 100}%`;
      spot.style.height = `${(region.h / 220) * 100}%`;
      spot.setAttribute("aria-label", region.label);
      spot.addEventListener("click", () => {
        const found = selected.indexOf(region.id);
        if (found >= 0) selected.splice(found, 1);
        else selected.push(region.id);
        spot.classList.toggle("selected", selected.includes(region.id));
        onChange([...selected]);
      });
      wrap.append(spot);
    });
    return wrap;
  }

  function renderChatSim(puzzle, onChange) {
    const wrap = el("div", "grid");
    const chat = el("div", "chat-sim");
    puzzle.script.forEach((line) => {
      const bubble = el("p", `chat-line ${line.from === "ALGO" ? "algo" : ""}`);
      bubble.textContent = `${line.from}: ${line.text}`;
      chat.append(bubble);
    });
    wrap.append(chat, el("p", "prompt", puzzle.decision.prompt));
    wrap.append(renderChoiceList({ options: puzzle.decision.options }, false, onChange));
    return wrap;
  }

  function renderFeedMark(puzzle, onChange) {
    const selected = [];
    const wrap = el("div", "grid");
    if (puzzle.instruction) wrap.append(el("p", "helper", puzzle.instruction));
    const list = el("div", "feed-list");
    puzzle.posts.forEach((post) => {
      const card = button("feed-post", "");
      card.innerHTML = `<strong>${escapeHtml(post.handle)}</strong><span>${escapeHtml(post.text)}</span>`;
      card.setAttribute("aria-pressed", "false");
      card.addEventListener("click", () => {
        const found = selected.indexOf(post.id);
        if (found >= 0) selected.splice(found, 1);
        else selected.push(post.id);
        card.classList.toggle("selected", selected.includes(post.id));
        card.setAttribute("aria-pressed", String(selected.includes(post.id)));
        onChange([...selected]);
      });
      list.append(card);
    });
    wrap.append(list);
    return wrap;
  }

  function renderTextInput(puzzle, onChange) {
    const field = el("div", "field");
    const label = el("label", "", "Your answer");
    label.htmlFor = "text-answer";
    const input = el("input");
    input.id = "text-answer";
    input.type = "text";
    input.autocomplete = "off";
    input.placeholder = "Type a short answer";
    input.addEventListener("input", () => onChange(input.value));
    field.append(label, input);
    return field;
  }

  function renderAudio(puzzle, onChange) {
    const wrap = el("div", "audio-box");
    const audio = el("audio");
    audio.controls = true;
    audio.src = puzzle.audio;
    wrap.append(audio, el("p", "helper", puzzle.transcript));
    wrap.append(renderChoiceList(puzzle, false, onChange));
    return wrap;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  const PuzzleRenderers = {
    render(puzzle, onChange) {
      switch (puzzle.type) {
        case "multiple-choice":
          return renderChoiceList(puzzle, false, onChange);
        case "multi-select":
          return renderChoiceList(puzzle, true, onChange);
        case "order":
          return renderOrder(puzzle, onChange);
        case "categorise":
          return renderCategorise(puzzle, onChange);
        case "text-input":
          return renderTextInput(puzzle, onChange);
        case "hotspot":
          return renderHotspot(puzzle, onChange);
        case "chat-sim":
          return renderChatSim(puzzle, onChange);
        case "feed-mark":
          return renderFeedMark(puzzle, onChange);
        case "audio":
          return renderAudio(puzzle, onChange);
        default:
          return el("p", "feedback wrong", `Unsupported puzzle type: ${puzzle.type}`);
      }
    }
  };

  window.PuzzleRenderers = PuzzleRenderers;
})();
