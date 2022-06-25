package services

import (
	"fmt"
	"io"
	"log"
)

// Tracerはコード内での出来事を記録できるオブジェクトを表すインタフェースです。
type Tracer interface {
	Trace(...interface{})
}

func NewTracer(w io.Writer) Tracer {
	return &tracer{out: w}
}

type tracer struct {
	out io.Writer
}

func (t *tracer) Trace(a ...interface{}) {
	log.Print(fmt.Sprint(a...))
	t.out.Write([]byte(fmt.Sprint(a...)))
	t.out.Write([]byte("\n"))
}

type nilTracer struct{}

func (t *nilTracer) Trace(a ...interface{}) {}

// OffはTraceメソッドの呼び出しを無視するTracerを返します。
func NewOffTracer() Tracer {
	return &nilTracer{}
}
