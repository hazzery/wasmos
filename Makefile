TARGET := web
WASM_OUTPUT_DIRECTORY := ../public/wasm

all: public/wasm/wasmos_bg.wasm
	npm run dev

public/wasm/wasmos_bg.wasm: wasmos-rs/src/lib.rs
	cd wasmos-rs; wasm-pack build --target $(TARGET) --out-dir $(WASM_OUTPUT_DIRECTORY)

.PHONY: all
